import {Component} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import './index.css'
// convert SnakeCase into CamelCase
// if date not formatted use date-fns package
// if activeMedicationsCount not given use activeMedications.length to get the value

const data = JSON.stringify({
  labNo: 'MED004.119657',
  pName: 'Joyneel Acharya',
  Gender: 'Male',
  DOB: '16 May 1991',
  DOI: '30 Nov 2020',
  ReferredBy: 'Self',
  activeMedicationsCount: 3,
  activeMedications: [
    {
      tabletId: 1,
      tabletName: 'IBUPROFEN 600mg TAB',
      tabletDetails: {
        appearanceImg:
          'https://res.cloudinary.com/pvsaiganesh/image/upload/v1626789509/Tablet_1_rrorrv.jpg',
        reasonForMedication: 'For treatment of lowerback pain',
        directions: '1 tablet by mouth 4 times a day with food every 4 hours',
        directionsImg:
          'https://res.cloudinary.com/pvsaiganesh/image/upload/v1626789509/Directions_1_wa7675.jpg',

        possibleSideEffects: [
          {
            sideEffectId: 1,
            sideEffectImage:
              'https://res.cloudinary.com/pvsaiganesh/image/upload/v1626789509/icon1_hsz8ks.jpg',
            sideEffectName: 'Headache',
          },
          {
            sideEffectId: 2,
            sideEffectImage:
              'https://res.cloudinary.com/pvsaiganesh/image/upload/v1626789509/icon2_v2rvka.jpg',
            sideEffectName: 'Dizziness',
          },
        ],
        medicalHelpInfo:
          'Experiencing chest pain,shortness of breath and rapid weight gain.',
      },
    },
    {
      tabletId: 2,
      tabletName: 'INSULIN, GLARGINE, HUMAN 100 UNT/ML INJ',
      tabletDetails: {
        appearanceImg:
          'https://res.cloudinary.com/pvsaiganesh/image/upload/v1626789510/Tablet_2_kaksf0.jpg',
        reasonForMedication: 'Reduce blood pressure',
        directions:
          '1 injection at bedtime Inject 10 ml vial under the skin as directed for 28 days inject 25 units under the skin at bedtime do not mix with other insulins/discard open vials after 28 days.',
        directionsImg:
          'https://res.cloudinary.com/pvsaiganesh/image/upload/v1626789509/Directions_2_qjy6aq.jpg',

        possibleSideEffects: [
          {
            sideEffectId: 1,
            sideEffectImage:
              'https://res.cloudinary.com/pvsaiganesh/image/upload/v1626789509/icon1_hsz8ks.jpg',
            sideEffectName: 'Headache',
          },
          {
            sideEffectId: 2,
            sideEffectImage:
              'https://res.cloudinary.com/pvsaiganesh/image/upload/v1626789510/icon3_vuy30w.jpg',
            sideEffectName: 'Fatigue',
          },
          {
            sideEffectId: 3,
            sideEffectImage:
              'https://res.cloudinary.com/pvsaiganesh/image/upload/v1626789510/icon4_dndv9b.jpg',
            sideEffectName: 'Nausea',
          },
        ],
        medicalHelpInfo:
          'Experiencing itching skin,wheezing, and fast heart rate.',
      },
    },
    {
      tabletId: 3,
      tabletName: 'TERAZOSIN HCL 2MG CAPSULE',
      tabletDetails: {
        appearanceImg:
          'https://res.cloudinary.com/pvsaiganesh/image/upload/v1626795268/tablet_3_qkksw0.jpg',
        reasonForMedication:
          'For treatment of symptoms of an enlarged prostate.',
        directions: '3 capsules before bed.',
        directionsImg:
          'https://res.cloudinary.com/pvsaiganesh/image/upload/v1626795518/Directions_3_klrbbw.jpg',

        possibleSideEffects: [
          {
            sideEffectId: 2,
            sideEffectImage:
              'https://res.cloudinary.com/pvsaiganesh/image/upload/v1626789509/icon2_v2rvka.jpg',
            sideEffectName: 'Dizziness',
          },
          {
            sideEffectId: 1,
            sideEffectImage:
              'https://res.cloudinary.com/pvsaiganesh/image/upload/v1626789509/icon1_hsz8ks.jpg',
            sideEffectName: 'Headache',
          },
          {
            sideEffectId: 3,
            sideEffectImage:
              'https://res.cloudinary.com/pvsaiganesh/image/upload/v1626789509/icon5_yvbcto.jpg',
            sideEffectName: 'Constipation',
          },
          {
            sideEffectId: 4,
            sideEffectImage:
              'https://res.cloudinary.com/pvsaiganesh/image/upload/v1626789509/icon6_mfsgzd.jpg',
            sideEffectName: 'Loss of appetite',
          },
        ],
      },
    },
  ],
})

class SmartRx extends Component {
  state = {totalData: []}

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    this.setState({totalData: JSON.parse(data)})
  }

  renderHeader = () => {
    const {totalData} = this.state
    return (
      <div className="header">
        <div>
          <sup className="main-heading">MEDICATIONS</sup>
          <h1 className="main-heading-2">{`Active Medications (${totalData.activeMedicationsCount})`}</h1>
        </div>
        <div>
          <p className="sub-heading">Patient Name</p>
          <h1 className="sub-heading-2">{totalData.pName}</h1>
        </div>
        <div>
          <p className="sub-heading">Date Of Birth</p>
          <h1 className="sub-heading-2">{totalData.DOB}</h1>
        </div>
        <div>
          <p className="sub-heading">Date Of Issue</p>
          <h1 className="sub-heading-2">{totalData.DOI}</h1>
        </div>
      </div>
    )
  }

  renderTabletDetails = () => {
    const {totalData} = this.state
    let {activeMedications} = totalData
    if (activeMedications === undefined) {
      activeMedications = []
    }
    return (
      <Container fluid>
        <Row>
          <Col>
            {activeMedications.map(item => {
              const {tabletName, tabletDetails} = item
              const {
                appearanceImg,
                reasonForMedication,
                directions,
                directionsImg,
                medicalHelpInfo,
              } = tabletDetails
              let {possibleSideEffects} = tabletDetails
              if (possibleSideEffects === undefined) {
                possibleSideEffects = []
              }
              return (
                <div key={item.tabletId}>
                  <h1 className="tablet-name">{tabletName}</h1>
                  <Row>
                    <Col sm={4} className="card">
                      <img src={appearanceImg} alt="img" />
                      <hr className="horizontal-rule" />
                      <div>
                        <p className="gray-text">Reason for medication</p>
                        <p className="black-text">{reasonForMedication}</p>
                      </div>
                    </Col>
                    <Col sm={4} className="card">
                      <p className="gray-text">Directions/Notes</p>
                      <p className="black-text">{directions}</p>
                      <hr />
                      <img
                        className="directions-image"
                        src={directionsImg}
                        alt="img"
                      />
                    </Col>
                    <Col sm={4} className="card no-right-border">
                      <p className="gray-text">Possible Side Effects</p>
                      <ul>
                        {possibleSideEffects.map(sideEffect => {
                          const {
                            sideEffectId,
                            sideEffectImage,
                            sideEffectName,
                          } = sideEffect
                          return (
                            <li className="row" key={sideEffectId}>
                              <img src={sideEffectImage} alt="img" />
                              <p className="black-text">{sideEffectName}</p>
                            </li>
                          )
                        })}
                      </ul>
                      {medicalHelpInfo === undefined ? (
                        ''
                      ) : (
                        <div>
                          <hr className="horizontal-rule" />
                          <div>
                            <p className="gray-text">Medical Help Info</p>
                            <p className="black-text">{medicalHelpInfo}</p>
                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>
                  <hr className="horizontal-rule" />
                </div>
              )
            })}
          </Col>
        </Row>
      </Container>
    )
  }

  renderFooter = () => (
    <div>
      <hr className="horizontal-rule" />
      <p className="bold-text">
        MEDICATIONS:<span>ACTIVE MEDICATIONS</span>
      </p>
    </div>
  )

  render() {
    return (
      <div className="bg">
        <div>
          <div>{this.renderHeader()}</div>
          <hr />
          <hr />
          <div>{this.renderTabletDetails()}</div>
        </div>
        <div>{this.renderFooter()}</div>
      </div>
    )
  }
}
export default SmartRx
