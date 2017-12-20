class LoadingService extends Service{
	public constructor() {
		super();
	}

	public login(username: string, password: string) {
		this.send("User", {"username": username, "password": password});
	}
}