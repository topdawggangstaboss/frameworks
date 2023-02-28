import { Container } from "react-bootstrap";
import HomeCarousel from "./HomeCarousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

type HomeProps = {
  name: string;
};

export const Home = ({ name }: HomeProps) => {
  const history = useHistory();

  return (
    <Container>
      <HomeCarousel />
      <section className="news" style={{ textAlign: "center" }}>
        {name !== "anonymous" ? (
          <h2 className="message">Hi {name}, see our latest styles</h2>
        ) : (
          <h2 className="message">See our latest styles</h2>
        )}

        <div className="container mt-4 index">
          <div className="row justify-content-left">
            <div className="col-md-3 col-12">
              <div
                className="card border-0 index"
                onClick={() => history.push(`/product/2}`)}
              >
                <img
                  className="card-img-top index"
                  src="images/children/TINDURsweater1.jpg"
                  alt="tindur sweater"
                  style={{ borderRadius: "50%" }}
                />
                <p className="card-title" style={{ textAlign: "center" }}>
                  Tindur Sweater
                </p>
                <p className="card-price-news">800 kr</p>
              </div>
            </div>

            <div className="col-md-3 col-12">
              <div
                className="card border-0 index"
                onClick={() => history.push(`/product/13}`)}
              >
                <img
                  className="card-img-top index"
                  src="images/adult/img-ylur.jpg"
                  alt="ylur cardigan"
                  style={{ borderRadius: "50%" }}
                />
                <p className="card-title" style={{ textAlign: "center" }}>
                  Ylur Cardigan
                </p>
                <p className="card-price-news">2.300 kr</p>
              </div>
            </div>

            <div className="col-md-3 col-12">
              <div
                className="card border-0 index"
                onClick={() => history.push(`/product/3}`)}
              >
                <img
                  className="card-img-top index"
                  src="images/children/ylur16.jpg"
                  alt="sky sweater"
                  style={{ borderRadius: "50%" }}
                />
                <p className="card-title" style={{ textAlign: "center" }}>
                  Ský Sweater
                </p>
                <p className="card-price-news">900 kr</p>
              </div>
            </div>

            <div className="col-md-3 col-12">
              <div
                className="card border-0 index"
                onClick={() => history.push(`/product/4}`)}
              >
                <img
                  className="card-img-top index"
                  src="images/children/Lava800.jpg"
                  alt="lava sweater"
                  style={{ borderRadius: "50%" }}
                />
                <p className="card-title" style={{ textAlign: "center" }}>
                  Lava Sweater
                </p>
                <p className="card-price-news">800 kr</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ textAlign: "center" }}>We make clothes for everyone</h2>
        <br />
        <p className="description">
          The Icelandic word Ylur represents warmth and comfort. The name itself
          sounds soft and soothing and it induces a warm feeling like the
          beautiful garments that are knitted from silky-smooth Alpaca wool. The
          Alpaca’s incredible softness, combined with strength and durability
          make it the perfect material for children’s clothing. Alpaca is a
          natural fiber, soft and durable and will not feel itchy next to the
          soft and sensitive skin of your baby. By choosing the Alpaca wool,
          Ylur stays clear of allergenic and harmful materials. The mild colors
          and timeless design work together to create lovely, long-lasting
          clothes, perfect for passing on to siblings or even future
          generations. The farming of the Peruvian Alpaca is very environmental,
          making it ideal for our planet and children at the same time.
        </p>
      </section>
    </Container>
  );
};
