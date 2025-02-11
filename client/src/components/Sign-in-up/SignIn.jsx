import "./SignIn.css"

export default function SignIn() {

    return (
        <form class="form">
            <span class="input-span">
                <label for="username" class="label">Username</label>
                <input type="username" name="username" id="username"
                /></span>
            <span class="input-span">
                <label for="password" class="label">Password</label>
                <input type="password" name="password" id="password"
                /></span>
            <span class="span"><a href="#">Forgot password?</a></span>
            <input class="submit" type="submit" value="Log in" />
            <span class="span">Don't have an account? <a onClick={() => console.log("asd")}>Sign up</a></span>
        </form>
       )
}