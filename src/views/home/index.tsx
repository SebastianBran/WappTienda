import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../admin/components/adminHeader';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white h-screen">
      <AdminHeader />

      <main className='h-full'>
        <section className="bg-gray-100 pb-16 pt-36 h-full bg-gradient-to-t from-teal-100 to-white">
          <div className="container mx-auto h-full">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-6xl font-bold mb-4">Crea Ecommerce para WhatsApp</h1>
              <p className="text-gray-600 my-8">
                Crea tu tienda online y simplifica tus ventas con WhatsApp. Con WappTienda puedes crear tu tienda en minutos y empezar a vender tus productos.
              </p>
              <Button size="lg" onClick={() => navigate('/register')}>
                Comienza ahora
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;