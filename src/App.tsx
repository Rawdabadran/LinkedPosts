
import { routes } from './Routing/Routes'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';

export default function () {
  return (
    <div className='bg-gray-100'>
      <RouterProvider router={routes} />
       <ToastContainer/>
    </div>
  )
}
