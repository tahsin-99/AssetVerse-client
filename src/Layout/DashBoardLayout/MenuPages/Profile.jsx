import Loading from '../../../Components/Loading'
import useAuth from '../../../hooks/useAuth'
import unknownUser from '../../../assets/images/unknownUser.png'
import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'


const Profile = () => {
  const { user } = useAuth()
  const axiosSecure=useAxiosSecure()
  

   const { data:employee, isLoading} = useQuery({
    queryKey: ['lastApprovedCompany', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get('/profile') 
      return res.data
    },
  })
 if(isLoading){
    return <Loading></Loading>
 }
 console.log(employee);
  return (
     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-5">
      <h1 className="text-4xl font-bold mb-5">My Profile</h1>

      <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-md text-center w-full max-w-md">
        <img
          src={user?.photoURL || unknownUser}
          alt="User"
          className="w-32 h-32 rounded-full mx-auto mb-5 object-cover"
        />
        <h2 className="text-2xl font-semibold mb-2">{user?.displayName || "No Name Found"}</h2>
        <p className="text-gray-400 mb-6">{user?.email||'No Email Found'}</p>
        <p >Last company affiliation: <span className='text-orange-500 font-semibold '> {employee?.lastCompany||'No Company'}</span></p>

        <Link
          to="/update-profile"
          className="btn btn-primary w-full bg-[#BB86FC] text-black hover:bg-[#9B6DFD] mt-4"
        >
          Update Information
        </Link>
        <Link to='/' className="btn btn-primary w-full mt-5 ">
        
        Go Home
        </Link>

      </div>
    </div>
  )
}

export default Profile