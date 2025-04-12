import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../config/env.js';
import Host from '../models/host.model.js';

const authorize = async (req, res, next) => {
    try{
      let token;

      // Check if the token is in the header
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Verify the token
      const decoded = await jwt.verify(token, JWT_SECRET);

      const host = await Host.findById(decoded.hostId);

      if (!host) return res.status(401).json({ message: "Unauthorized" });

      // Use Object.defineProperty() to set req.host dynamically
      Object.defineProperty(req, "host", {
        value: host,
        writable: true,
        enumerable: true,
        configurable: true,
      });

      next();
    }catch(error){
        console.log(error);
        res.status(401).json({'message': 'Unauthorized', 'error': error.message});
    }
}

export default authorize;