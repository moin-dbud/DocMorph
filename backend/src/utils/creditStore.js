/**
 * In-memory credit store (temporary)
 * Key = userId
 */
const credits = {};

export const getCredits = (userId) => {
  if (!credits[userId]) {
    credits[userId] = 5; // Free plan default
  }
  return credits[userId];
};

export const deductCredit = (userId, amount = 1) => {
  if (!credits[userId]) {
    credits[userId] = 5;
  }

  if (credits[userId] < amount) {
    return false;
  }

  credits[userId] -= amount;
  return true;
};
