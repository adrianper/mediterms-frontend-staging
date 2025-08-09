import {
	Home,
	Login,
	Terms,
	TestComponents,
	Account,
	ChangePassword,
	FinalDemo,
	ChangeRecoveredPassword,
	Institutions,
	UserSignup,
	NoVerifiedAccount,
	VerifiedAccount,
	Payment,
	Privacy,
	AccountDeletion,
} from "pages"
import { AiFillHome, AiOutlineLogin } from "react-icons/ai"
import { RiTestTubeFill } from "react-icons/ri"

export const headerRoutes = ["account"]

export const sideMenuRoutes = ["testComponents"]

export const publicRoutes = ["terms", "finalDemo", "changeRecoveredPassword", "institutions", "privacy"]
export const requireNoAuthRoutes = ["login", "userSignup", "verifiedAccount"]
export const requireAuthRoutes = [
	"home",
	"testComponents",
	"account",
	"changePassword",
	"payment",
	"account_deletion",
]

export const routes = {
	home: {
		path: "/",
		linkName: "Home",
		element: <Home />,
		icon: <AiFillHome />,
	},
	terms: {
		path: "/terms/:topic?",
		linkName: "Terms",
		element: <Terms />,
	},
	login: {
		path: "/login",
		linkName: "Login",
		element: <Login />,
		icon: <AiOutlineLogin />,
	},
	testComponents: {
		path: "/testComponents",
		linkName: "Test Components",
		element: <TestComponents />,
		icon: <RiTestTubeFill />,
	},
	account: {
		path: "/account",
		linkName: "Account",
		element: <Account />,
	},
	account_deletion: {
		path: "/eliminar_cuenta",
		linkName: "Delete account",
		element: <AccountDeletion />,
	},
	changePassword: {
		path: "/changePassword",
		linkName: "changePassword",
		element: <ChangePassword />,
	},
	finalDemo: {
		path: "/finalDemo",
		linkName: "finalDemo",
		element: <FinalDemo />,
	},
	changeRecoveredPassword: {
		path: "/changeRecoveredPassword",
		linkName: "changeRecoveredPassword",
		element: <ChangeRecoveredPassword />,
	},
	institutions: {
		path: "/institutions",
		linkName: "institutions",
		element: <Institutions />,
	},
	userSignup: {
		path: "/userSignup",
		linkName: "userSignup",
		element: <UserSignup />,
	},
	noVerifiedAccount: {
		path: "/noVerifiedAccount",
		linkName: "noVerifiedAccount",
		element: <NoVerifiedAccount />,
	},
	verifiedAccount: {
		path: "/verifiedAccount",
		linkName: "verifiedAccount",
		element: <VerifiedAccount />,
	},
	payment: {
		path: "/payment",
		linkName: "payment",
		element: <Payment />,
	},
	privacy: {
		path: "/privacidad",
		linkName: "privacy",
		element: <Privacy />,
	},
}

export const noRedirectPaths = [routes.account.path, routes.changePassword.path]
