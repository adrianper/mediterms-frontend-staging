import { Route } from "react-router-dom"

import { AiFillHome, AiOutlineLogin } from "react-icons/ai"
import { RiTestTubeFill } from "react-icons/ri"

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
	Ranking,
} from "pages"

import {
	AdminHome,
	AdminLogin,
} from "@admin_pages"

export const headerRoutes = ["account"]

export const sideMenuRoutes = ["testComponents"]

export const publicRoutes = ["terms", "finalDemo", "changeRecoveredPassword", "institutions", "privacy"]

export const requireNoAuthRoutes = ["login", "userSignup", "verifiedAccount"]
export const requireAuthRoutes = [
	"home",
	"testComponents",
	"account",
	"account_deletion",
	"changePassword",
	"payment",
	"ranking",
]

export const requireNoAuthAdminRoutes = ['login']

export const requireAuthAdminRoutes = ['home']

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
		children: [
			// {
			// 	path: "/account/ranking",
			// 	element: <Ranking />
			// }
		]
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
	ranking: {
		path: "/ranking",
		linkName: "Account",
		element: <Ranking />,
	},
}

export const adminRoutes = {
	login: {
		path: "/admin/login",
		element: <AdminLogin />
	},
	home: {
		path: "/admin/home",
		element: <AdminHome />
	},
}

export const noRedirectPaths = [routes.account.path, routes.changePassword.path]

export const renderRoute = ({ path, element, children }) => {
	return (
		<Route key={path} path={path} element={element}>
			{children?.map(child => renderRoute(child))}
		</Route>
	)
} 