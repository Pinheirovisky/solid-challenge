import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    return this.users.find((element) => element.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((element) => element.email === email);
  }

  turnAdmin(receivedUser: User): User {
    const admin = {
      ...receivedUser,
      admin: true,
    };

    const key = this.users.findIndex(
      (element) => element.id === receivedUser.id
    );

    this.users[key] = admin;

    return admin;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
