/**
 * Mock authentication middleware
 * Later replaced by Clerk verification
 */
export const requireAuth = (req, res, next) => {
  const userId = req.headers["x-user-id"];

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: User not authenticated",
    });
  }

  req.user = { id: userId };
  next();
};
