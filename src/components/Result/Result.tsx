import useFormContext from '../../hooks/useFormContext'
import localeEn from './i18n/localeEn';

const Result = () => {
  const { state: { result } } = useFormContext();

  if (!result) {
    return null
  }

  return (
    <section className="results--container">
      <div className="results--container-left">
        <main className="results--container-title">
          {result.shippingChannel === 'Air' ?
            <span className="results--header-title">
              <i className="fas fa-plane icon fa-2x" />
              {localeEn.en.AIR_FREIGHT}
            </span>
            :
            <span className="results--header-title">
              <i className="fas fa-ship icon fa-2x" />
              {localeEn.en.OCEAN_FREIGHT}
            </span>
          }
        </main>
        <div className="results--container-dates">
          <span className="results--container-date-range">
            {result.lowerBoundRangeDate} - {result.upperBoundRangeDate} {localeEn.en.DAYS}
          </span>
          <span className="results--container-delivery-label">
            {localeEn.en.ESTIMATED_DELIVERY}
          </span>
          <span className="results--container-delivery">
            {result.estimatedDelivery}
          </span>
        </div>
      </div>
      <div className="results--container-right">
        <main className="results--header-route">
          <span className="results--header-route-title">
            {result.startingCountry} -{'>'} {result.destinationCountry}
          </span>
        </main>
        <div className="results--container-price">
          <span className="results--price">
            {result.formattedPrice}
          </span>
        </div>
      </div>
    </section>
  )
}

export default Result;