class JwtStorage {
  setJwt(jwt: string) {
    localStorage.setItem("jwt", jwt);
  }

  getJwt() {
    return localStorage.getItem("jwt");
  }
}

const instance = new JwtStorage();
export default instance;
