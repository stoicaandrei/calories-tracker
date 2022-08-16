import { UserRole } from '@calories-tracker/api-interfaces';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const isAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies.AuthToken;

  if (!token) {
    return res.status(401).send({
      message: 'Not authorized!',
    });
  }

  try {
    const decoded = jwt.verify(token, 'secret') as {
      _id: string;
      roles: UserRole[];
    };

    req.userId = decoded._id;
    req.userRoles = decoded.roles;
    next();
  } catch (err) {
    return res.status(401).send({
      message: 'Not authorized!',
    });
  }
};

const hasRole = (role: UserRole) => {
  const middleware: RequestHandler = (req, res, next) => {
    isAuth(req, res, () => {
      if (!req.userRoles.includes(role)) {
        return res.status(401).send({
          message: 'Not authorized!',
        });
      }

      next();
    });
  };

  return middleware;
};

export const isAdmin = hasRole(UserRole.admin);
