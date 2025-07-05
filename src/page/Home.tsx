
import { SquarePen, Trash } from 'lucide-react'
import { useDeleteStackMutation, useGetAllStacksQuery } from '../store/stackApi'
import { Button } from '../components/ui/button'
import { API } from '../hooks/getEnv'
import { formatTime } from '../hooks/formatTime'
import Modal from '../components/Modal'
import { Dialog, DialogClose, DialogTrigger } from '@radix-ui/react-dialog'

export interface StackType {
  id: number,
  name: string,
  createdAt: string,
  image: string
}


function Home() {

  const { data: stacks = {}, isLoading, isError } = useGetAllStacksQuery("")
  const [deleteFn] = useDeleteStackMutation()

  if (isError) "Error"
  if (isLoading) "Loading..."

  function handleDelete(id: number) {
    deleteFn(id)
  }
  return (
    <>
      <div className='flex justify-between flex-wrap gap-[20px] p-5'>
        {stacks?.data?.map((item: StackType) => (
          <div key={item.id} className='w-[250px] bg-slate-800 rounded-md overflow-hidden text-white'>
            <img className='mb-2' src={`${API}/file/${item.image}`} alt="Stack img" width={300} height={200} />
            <div className='p-3'>
              <h2 className='font-bold text-[20px]'>{item.name}</h2>
              <p>{formatTime(item.createdAt)}</p>
            </div>
            <div className='flex justify-end gap-2 p-2'>
              <div className='w-[35px] cursor-pointer h-[35px] flex justify-center items-center rounded-md bg-yellow-600 '><SquarePen size={25} /></div>
              <Dialog>
                <DialogTrigger>
                  <div className='w-[35px] cursor-pointer h-[35px] flex justify-center items-center rounded-md bg-red-600' ><Trash size={25} /></div>
                </DialogTrigger>
                <Modal title='Confirm to Delete!'>
                  <div className='flex justify-end gap-2'>
                    <DialogClose>
                      <div className='p-2 px-3 cursor-pointer hover:opacity-80 duration-200 rounded-md bg-slate-950 text-white font-semibold'>Cancel</div>
                    </DialogClose>
                    <Button onClick={() => handleDelete(item.id)} className="bg-red-600">Delete</Button>
                  </div>
                </Modal>
              </Dialog>

            </div>

          </div>
        ))}

      </div>
    </>
  )
}

export default Home
