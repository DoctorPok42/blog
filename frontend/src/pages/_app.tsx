import "../styles/globals.css";
import type { AppProps } from "next/app";
import App from "next/app";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";
import { dataService } from "../../services/data.service";

interface MyAppProps extends AppProps {
  headerData: Awaited<ReturnType<typeof dataService.getHeaderData>>;
}

function MyApp({ Component, pageProps, headerData }: Readonly<MyAppProps>) {
  return (
    <div>
      <Header nav={headerData.nav} />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  const headerData = await dataService.getHeaderData();

  return { ...appProps, headerData };
};

export default MyApp;
