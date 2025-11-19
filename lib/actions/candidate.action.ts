"use server";

import dbConnect from "../mongoose";

export const getCandidates = async () => {
  await dbConnect();
  return {
    name: "Rakib",
    age: 25,
  };
};
