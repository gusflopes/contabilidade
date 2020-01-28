import {
  Table,
  Column,
  Model,
  addHook,
  DataType,
  BeforeSave,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import bcrypt from 'bcryptjs';

class User extends Model<User> {
  @Column
  name: string;
  @Column
  email: string;
  @Column(type: VIRTUAL)
  password: string;
  @Column
  password_hash: string;
  @CreatedAt
  creationDate: Date;
  @UpdatedAt
  updatedOn: Date;

  @BeforeSave
  static async hashPassword(instance: User) {
    if (instance.password) {
      instance.password_hash = await bcrypt.hash(instance.password, 8);
    }
  }

  /*
  static checkPassword(password: string, instance: User) {
    return bcrypt.compare(instance.password, instance.password_hash);
  }
  */
}

export default User;
