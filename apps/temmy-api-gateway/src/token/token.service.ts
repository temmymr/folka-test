import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomBytes } from 'crypto';
import { Token } from 'apps/temmy-api-gateway/schemas/token.schema';

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token.name) private tokenModel: Model<Token>) {}

  async generateToken(): Promise<{ token: string; expiresAt: Date }> {
    const token = randomBytes(16).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

    const newToken = new this.tokenModel({ token, expiresAt });
    await newToken.save();

    return { token, expiresAt };
  }

  async validateToken(token: string): Promise<boolean> {
    const tokenDoc = await this.tokenModel.findOne({ token }).exec();
    if (!tokenDoc) return false;

    if (new Date() > tokenDoc.expiresAt) {
      await this.tokenModel.deleteOne({ _id: tokenDoc._id }).exec();
      return false;
    }

    return true;
  }

  async cleanExpiredTokens(): Promise<void> {
    await this.tokenModel.deleteMany({ expiresAt: { $lt: new Date() } }).exec();
  }
}
