export const authorize = () => {
  return new Promise((resolve) => {
    resolve({ token: "a fake token" });
  });
};

export const checkToken = () => {
  return new Promise((resolve) => {
    resolve({
      data: { name: "Sopuru", email: "fake@example,com", _id: "fake-id" },
    });
  });
};
