module AuthHelper
  def login_user(user)
    post "/api/v1/auth/sign_in", params: { email: user.email, password: user.password }
    response.headers.slice("client", "access-token", "uid")
  end
end
