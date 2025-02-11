import "./SignUp.css"

export default function SignUp() {

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
            <input class="submit" type="submit" value="Sign Up" />
        </form>
    )
}