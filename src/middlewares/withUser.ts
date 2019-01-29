import { Response, NextFunction } from 'express';
import { IRequest } from '../utils/request';
import { getUsers, IUser } from '../models/user';

export const USER_ID_COOKIE = 'uid';

export const withUser = async (req: IRequest, res: Response, next: NextFunction) => {
    const currentUid = req.cookies[USER_ID_COOKIE];

    if (!currentUid) {
        next();
    }

    const users = await getUsers();
    const user = users.find((record) => record.uid === currentUid);

    req.user = user;

    next();
};