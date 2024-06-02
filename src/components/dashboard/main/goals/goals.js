import './goals.css';

export const Goals = () => {
    return (
        <div>
            <div className="separator">
              <div className="info">
                <h3>My Goals</h3>
                <a className="btn" href="/account/create-pet-profile">
                  <button>Create New</button>
                </a>
                <a href="#">View All</a>
              </div>
            </div>

            <div className="goals">
              <div className="item">
                <div className="info">
                  <h5>Lose Fat</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis dictum nisl augue, vitae accumsan odio imperdiet et.
                  </p>
                </div>
              </div>
              <div className="item" id="notfound">
                <div className="info">
                  <h5>No Goals Found</h5>
                  <p>
                    <a href="/account/create-pet-profile">Create one</a> now!
                  </p>
                </div>
                <i className="bx bx-x"></i>
              </div>
            </div>
          </div>
    );
};