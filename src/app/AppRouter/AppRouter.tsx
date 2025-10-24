import { Authorization } from "@/pages/Authorization";
import { MainPage } from "@/pages/MainPage";
import { NotFound } from "@/pages/NotFound";
import { Profile } from "@/pages/Profile";
import { Registration } from "@/pages/Registration";
import { Route, Routes } from "react-router";


export  function AppRouter() {
  return (
    <Routes>
      <Route path="/" element = {<MainPage />} />
      <Route path="/registration" element = {<Registration />} />
      <Route path="/authorization" element = {<Authorization />} />
      <Route path="/profile" element = {<Profile />} />
      <Route path="*" element = {<NotFound />} />
    </Routes>
  )
}
