export enum AppRoute {
  Root = '/',
  Any = '/*',
  Login = '/login',
  Registration = '/registration',
  Product = '/product',
  Products = '/products'
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum ApiRoute {
  Products = '/products',
  Login = 'api/auth/login',
  Logout = '/logout',
  Registration = 'api/auth/registration'
}

export enum ProductsPageUsingCase {
  Browse = 'browse',
  Manage = 'manage',
  Unknown = 'unknown',
}
