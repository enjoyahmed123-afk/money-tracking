import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/routes";
import ErrorBoundary from "@/components/common/ErrorBoundary.jsx";
import { featchMe } from "./store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


export default function App() {

  const dispatch = useDispatch()
  const locale = useSelector((state) => state.language.locale)
  const theme = useSelector((state) => state.theme.mode)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(featchMe())
    }
  }, [dispatch])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#f6f8fc" : "#0d1430")
  }, [theme])


  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
