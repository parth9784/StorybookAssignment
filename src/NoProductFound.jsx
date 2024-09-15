import react from 'react';
import {Link} from 'react-router-dom';
function NoProductFound(){
  return(<>
      <div class="h-screen w-screen bg-gray-100 flex items-center">
        
        <div class= "container mx-auto flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
          
            <div class="max-w-md">
                <h1 class="text-5xl font-dark font-bold">404</h1>
                  <p class="text-2xl md:text-3xl font-light leading-normal">
                    Sorry we couldn't find this Product. </p>
                  <p class="mb-8">But don't worry, you can find plenty of other Product on our Homepage.</p>
                <Link to="/">
                  <button class="px-4 py-2 text-sm font-medium leading-5 text-white border border-transparent rounded-lg bg-primary-light hover:bg-primary-dark">Back to Homepage</button>
                </Link>
            </div>
          
          <div class="max-w-lg">
            <img src="https://plus.unsplash.com/premium_photo-1672883552341-eaebc9240719?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="shopping cart" class="w-full h-full object-cover" />
          </div>
          
        </div>
        
      </div>
    </>
  )
};

export default NoProductFound;