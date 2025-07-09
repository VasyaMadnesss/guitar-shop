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
  Login = '/login',
  Logout = '/logout',
  Registration = '/registration'
}

export enum ProductsPageUsingCase {
  Browse = 'browse',
  Manage = 'manage',
  Unknown = 'unknown',
}
