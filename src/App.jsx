import MainLayout from "./layouts/MainLayout";
import data from "./data.json"

function App() {
  const nombre = data.tienda.nombre;
  return (
    <MainLayout>
      <main className="grow flex flex-col items-center my-[20px]">
        <h2 className="text-[25px] font-extrabold">{ `${nombre}` }</h2>
        <p className="text-[18px]">Categoria: {data.categorias[0].nombre}</p>
        <div className="flex flex-wrap justify-center mt-5">
          <div className="w-2/5 flex flex-col items-center p-2 m-2 bg-white">
            <img src={data.productos[0].imagen} alt={data.productos[0].nombre} />
            <p className="">{data.productos[0].nombre}</p>
            <p className="">$ {data.productos[0].precio}</p>
          </div>

          <div className="w-2/5 flex flex-col items-center p-2 m-2 bg-white">
            <img src={data.productos[1].imagen} alt={data.productos[1].nombre} />
            <p className="">{data.productos[1].nombre}</p>
            <p className="">$ {data.productos[1].precio}</p>
          </div>

          <div className="w-2/5 flex flex-col items-center p-2 m-2 bg-white">
            <img src={data.productos[2].imagen} alt={data.productos[2].nombre} />
            <p className="">{data.productos[2].nombre}</p>
            <p className="">$ {data.productos[2].precio}</p>
          </div>

          <div className="w-2/5 flex flex-col items-center p-2 m-2 bg-white">
            <img src={data.productos[3].imagen} alt={data.productos[3].nombre} />
            <p className="">{data.productos[3].nombre}</p>
            <p className="">$ {data.productos[3].precio}</p>
          </div>
        </div>
      </main>
    </MainLayout>
  )
}

export default App
