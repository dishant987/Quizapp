import Score from "../models/score.js";
import { User } from "../models/user.js";

const generateToken = async function (userId, res) {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    return { accessToken };
  } catch (error) {
    console.log(error);
    return res.json({
      statuscode: 500,
      message:
        "Something went Wrong while generating referesh and access token",
    });
  }
};

export const signUp = async (req, res) => {
  try {
    const { username, email, password, gender } = req.body;

    if (!password) {
      return res.json({
        statuscode: 400,
        message: " password is required",
      });
    }
    if (!email) {
      return res.json({
        statuscode: 400,
        message: "email is required",
      });
    }
    if (!username) {
      return res.json({
        statuscode: 400,
        message: "username is required",
      });
    }
    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existedUser) {
      return res.status(409).json({
        statuscode: 409,
        message: "User with email or username already exists",
      });
    }

    const user = await User.create({
      username: username,
      email: email,
      password: password,
      gender: gender.toLowerCase(),
    });

    if (!user) {
      res.status(500).json({
        statuscode: 500,
        message: "Something went wrong while registering the user",
      });
    }

    res.status(201).json({
      message: "Signup Successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

//signin
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password) {
      return res.status(400).json({
        message: " password is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        message: "email is required",
      });
    }

    const user = await User.findOne({
      $or: [{ email }, { password }],
    });

    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid User credentials",
      });
    }

    const { accessToken } = await generateToken(user._id);

    const LoggedInUser = await User.findById(user._id).select("-password ");

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("quizAccessToken", accessToken, options)
      .json({
        user: LoggedInUser,
        accessToken,
        message: "Login SuccessFully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

//logout
export async function userLogout(req, res) {
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200).clearCookie("quizAccessToken", options).json({
    message: "User Logged Out",
  });
}

export const submitQuizResult = async (req, res) => {
  try {
    const { questions, selectedAnswers, userId } = req.body;

    // Calculate the score
    const correctAnswersCount = questions.reduce((total, question, index) => {
      return (
        total + (selectedAnswers[index] === question.correct_answer ? 1 : 0)
      );
    }, 0);

    // Determine pass or fail
    const achived = correctAnswersCount >= 5 ? "pass" : "fail";

    // Create and save the score result
    const score = new Score({
      result: selectedAnswers,
      points: correctAnswersCount,
      achived,
      user: userId,
    });

    await score.save();

    res
      .status(201)
      .json({ message: "Quiz result submitted successfully", score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

export async function userQuizData(req, res) {
  try {
    const { userId } = req.body;

    const data = await Score.find({ user: userId });

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
