export default function Footer (){

    return(
        <footer className="mt-auto dark:text-white text-center py-4">
        <div className="pb-2">
          &copy; {(new Date).getFullYear()} Giancarlo Culcay
        </div>
        <div className="inline opacity-75">
          <a href="https://www.linkedin.com/in/giancarlo-culcay/" target="_blank" className="font-semibold">Made with ❤️ by Giancarlo Culcay 🚀</a>
        </div>
      </footer>
    )
}

