import sha1 from 'sha1';
import Bull from 'bull';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';
import tokenUtils from '../utils/token';

const userQueue = new Bull('userQueue');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ error: 'Missing email' });

    if (!password) return res.status(400).json({ error: 'Missing password' });

    const user = await dbClient.findUser({ email });
    if (user) return res.status(400).json({ error: 'Already exist' });
    const hashPassword = sha1(password);
    const newUser = await dbClient.createUser({ email, password: hashPassword });

    userQueue.add({ userId: newUser.insertedId });
    return res.status(201).json({ id: newUser.insertedId, email });
  }

  static async getMe(req, res) {
    const tokenValue = req.header('X-Token');
    if (!tokenValue) return res.status(401).json({ error: 'Unauthorized' });

    const userId = await tokenUtils.retrieveToken(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const user = await dbClient.findUser({ _id: ObjectId(userId) });
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    return res.status(200).json({ id: user._id, email: user.email });
  }
}

module.exports = UsersController;
