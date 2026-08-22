import { useSelector } from "react-redux"


const ThemeProvider = ({children}) => {
    const { theme } = useSelector(store => store.theme) 

  return (
    <div className={theme}>
        <div className="bg-[#f2f4f7] text-gray-800 dark:text-gray-200 dark:bg-[#1b1b1c]">
            {children}
        </div>
    </div>
  )
}

export default ThemeProvider