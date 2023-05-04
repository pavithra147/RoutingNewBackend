import { Router } from "express";
import combinedExports from "../controller/signUpController";

const signUpRoute = () => {
  const router = Router();
  router.post("/register", combinedExports.signUpDetail);
  router.get("/register", combinedExports.getSignUpDetails);
  router.delete("/register/:id", combinedExports.deleteDetails);
  return router;
};

export { signUpRoute };
