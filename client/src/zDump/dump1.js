<>
            {console.log('from /', ifLogedIn)}

            {
              ifLogedIn? (<>
              {console.log('forom ifLog')}
              <Header/>
              <div id="content">
                <Feed production={production}/>
                <TopShow/>
              </div>
            </>) : (<>
            {console.log('from /NAvigate', ifLogedIn)}
            {/* <Navigate to="/auth"/></>) */}
            {/* {redirect('/auth')} */}
            </>)
            }
            </>









<Route path="auth" element={
          showAlert ? (<>
          {/* // To understand why when this alert run two times even when path="/". EXPLANATION => So, in react it's not like when url is this that route will run and so on. Maybe react run all the routes at once and pakage them in doing so it run at code to show alert even before loding the site, and when it match the url to provide the package it again run the alert. But for showAlert it's only true when url is "/auth" so it run only once unlike profile which is true for both "/" and "/auth". And hence showAlert really invoke conditional statement. */}
          {/* showAlert ? (<> */}
            {alert("You are already logged in, Logout first!!!")}
            <Navigate to="/"/>
          </>)
        : (
        <>
        {console.log(showAlert)}
          {/* <div className='blur'>
            <Header/>
            <div id="content">
              <Feed/>
              <TopShow/>
            </div>
          </div> */}
          <Auth/>
        </>)}/>