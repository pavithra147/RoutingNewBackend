import { Router } from "express";
import allExports from "../controller/detailController";
import { authenticateToken } from "../middleware/authenticateToken";
const detailRoute = () => {
  const router = Router();
  router.post("/details", authenticateToken, allExports.createDetail);
  router.get("/details", authenticateToken, allExports.getAllDetails);
  router.put("/details/:id", authenticateToken, allExports.updateDetail);
  return router;
};
export { detailRoute };
