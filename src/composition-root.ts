import "reflect-metadata";
import {UsersRepository} from "./repositories/users-repository";
import {UsersService} from "./domain/users-servise";
import {UsersController} from "./controllers/users-controller";
import {Container} from "inversify";
import {BloggersService} from "./domain/bloggers-service";
import {BloggersRepository} from "./repositories/bloggers-repository";
import {PostsService} from "./domain/posts-service";
import {PostsRepository} from "./repositories/posts-repository";
import {BloggersController} from "./controllers/bloggers-controller";
import {PostsController} from "./controllers/posts-controller";
import {AuthController} from "./controllers/auth-controller";
import {AuthService} from "./domain/auth-service";
import {AttemptsRepository} from "./repositories/attempts-repository";
import {RefreshRepository} from "./repositories/refresh-repository";
import {CommentsController} from "./controllers/comments-controller";
import {CommentsService} from "./domain/comment-service";
import {CommentsRepository} from "./repositories/comment-repository";
import {PostsModelClass} from "./settingses/db";
import {LikesRepository} from "./repositories/likes-repository";

/*const object: any[] = []

const usersRepository = new UsersRepository()
object.push(usersRepository)

const usersService = new UsersService(usersRepository)
object.push(usersService)

const usersController = new UsersController(usersService)
object.push(usersController)*/

export const container = new Container();

//auth
container.bind(AuthController).to(AuthController);
container.bind(AuthService).to(AuthService);
container.bind(AttemptsRepository).to(AttemptsRepository);
container.bind(RefreshRepository).to(RefreshRepository)

//users
container.bind(UsersController).to(UsersController);
container.bind(UsersService).to(UsersService);
container.bind(UsersRepository).to(UsersRepository);

//bloggers
container.bind(BloggersController).to(BloggersController);
container.bind(BloggersService).to(BloggersService);
container.bind(BloggersRepository).to(BloggersRepository);

//posts
container.bind(Symbol('PostsModelClass')).toConstantValue(PostsModelClass)
container.bind(PostsController).to(PostsController);
container.bind(PostsService).to(PostsService);
container.bind(PostsRepository).to(PostsRepository);

//comments
container.bind(CommentsController).to(CommentsController);
container.bind(CommentsService).to(CommentsService);
container.bind(CommentsRepository).to(CommentsRepository)

//like
container.bind(LikesRepository).to(LikesRepository);