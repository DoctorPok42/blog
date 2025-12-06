import { Html, Head, Main, NextScript } from "next/document";
import Header from "../../components/layout/header";
import { dataService } from "../../services/data.service";

const headerData = await dataService.getHeaderData();

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Header nav={headerData.nav} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
