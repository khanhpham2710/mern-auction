export const generateToken = (user, res) => {
  const { accessToken, refreshToken } = user.generateJsonWebToken();

  res.status(200)
    .cookie("accessToken", accessToken, {
      expires: new Date(
        Date.now() + process.env.ACCESS_JWT_EXPIRE * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .cookie("refreshToken", refreshToken, {
      expires: new Date(
        Date.now() + process.env.REFRESH_JWT_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      message : "Login successfully.",
      user,
      accessToken,
      refreshToken,
    });
};

export const refreshAccessToken = (user, res) => {
  const accessToken = user.refreshToken();

  res
    .status(200)
    .cookie("accessToken", accessToken, {
      expires: new Date(
        Date.now() + process.env.ACCESS_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Refresh token successfully.",
      user,
      accessToken,
    });
};
