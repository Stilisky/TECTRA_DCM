import { useContext } from "react"
import { NavigationContainer } from "@react-navigation/native";
import { UserContext } from "../context/userContext"
import { Loading } from "../components/ui/Loading";
import AuthNavigation from "./AuthNavigation";
import AppNavigation from "./AppNavigation";


export const Navigation = () => {

  const { loading, mounted, user } = useContext(UserContext);

  const Navigator = () => {
      if (loading) return <Loading size={30} />
      if (!mounted) return null;
      if (!user) return <AuthNavigation />;
      return <AppNavigation/>;
  }

  return (
    <NavigationContainer>
        <Navigator />
    </NavigationContainer>
  )
}