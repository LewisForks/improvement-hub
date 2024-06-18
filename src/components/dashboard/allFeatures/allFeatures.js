import { Link } from "react-router-dom";
import "./allFeatures.css";

export const AllFeatures = () => {
  return (
    <div>
      <div className="separator">
        <h4>All Features</h4>
      </div>

      <div className="feature-list">
        <Link to="/account/goals">
        <div className="item">
          <div>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADR0lEQVRoQ+1Zy3HbMBB9SC72zenAvsXJJepAqiByBbEriF1B7ApsVxB1YKeCMBVIl4S+hR1ExzgzNrMLUhRIggRAEqTGQ8xoRhLx2befh92lwAsZ4oXgwAhk1yzZyCJxiCnZ8toDmAgxvoljLFz3dgYS/8QHvMLS9SDH+UcEJnJZ4w7kF849WUOV+5KAXPkFEuILHXDpckiDue2BxEscYI/cB/ikFUDQs1g+9zcEVnTGquKAH7oYKrlW3I/rtFNCjAvxDjfqJmUgD7gjbczbneR9dURWOTIBWXp3nfY4GwARuC/465Tk4I/PEdDm/NmMQ/pyqvxuAAQ4U4OLLsPeWYvidk6UfzcCSTUwWqRFEOUuxGauFeJ7LpgLnD1IjIQy0L8qigkobmcm+r0mljrPJu0mkAUBOasHUmalvJmHYa18oipwI97ioh5IkeroHqFFJ5tFg7hWOdvIERDLpsu18pwtsCYgbwYFEuI3nc+XYjJinFCudV9vkST7/VNgnKzQ6dsiFYVcqfDSFlYkbF4DQBZcvQMJJVvVpida15KWe6B6XGWuxDxSC30CobMOyfk5iT3IPEQT6NVAdO5FxQ7FyqQvIPiLW+yTNYolxTMm4n256Kqs2UngokmZGrhyW5MGpoUY6vYnZ9wc3MVKtMIalRaR7pVYhbslW7boVlzX3SKy0kRMpCJLo7aLIn0UMvCHHXQF4AkznUttBDO2gyT9vZa+6rfhUK2qAM9Uo2viQl1iBLKZnDYlPnqPj610AXcd8UjUX+FOjYCoi1JaZIruukmxIO3f4h8iG+FbA8nIYJ9S/u5crjaYTUFq7Vq6jbQXlulEPeWsZf50nGs4OO3UCoi0THL7ci+sKRlEtM3MtWldRNkaSOZme/I1w6m1GplSueXDhZtj511vVOuTzRPTTPUzWWiey4/yUZkAeMKViVLNJ25ndGKRiviZ0v9c/6tjRrfzypWRbAD5A2Koa2yEc5kzAjFpK006KytN03rX551ZRNKwSsFCFkNqL4prbe58MN0m4xFBV/HSJRBdcJsUy/dHYJpk83wEUtSSfPdepluTMnfQIsn7d/UdhgkEP+dG2265lo3UPud0FiM+hbTZewRio6U+5/wHMB9WQoHPJbEAAAAASUVORK5CYII=" />
            <h3 style={{ color: '#FFD700' }}>Goals</h3>
          </div>
        </div>
        </Link>
        <Link to=""> {/* add path */}
        <div className="item">
          <div>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAB80lEQVRoQ+2YUU7CMBjH28QlPuIzk8AN8Bkl7ATiDeQGegKP4BHkBu4GmAjv3MAlbImPfTQBVju0hgDja7tv3YLliYT23/7+/6/9xig5kQ89EQ7iQOqWpEvEJVKSA660SjLWWNYlYmxdSRNdIiUZayz7fxLxF+8Dznnb2KojE731Oow6AcPQBhNpxtMXMegeY7E9Dc6D+PLmDUPbgWC4SCwn8iBiu0XZ+I4IJ/Qx8XtzDG2wtDAWsaHhQGy4rLMGmEj7Y9LQEdQZi9VDsjVBENdHVKKxfP1W1tmzsv4ipPHZCSLIl9qWVgax9LxnscGh6DcB1G9AEOkK5IjJ7+eEsEMHfgtCPuMxCAYEMdlgkTkHIDZynJDIWy6v8m66WoHkQQgORtN0tGj1wzyTagNSBEKpj/jJ7Ek8pQ60y4VSFjd7dyrzikIogRRoiCz2ry+2QZrxrCuq/ZVyPpJ/qDAgrIL8QRDS/jm9PDhbrea/V6y8nSQ3eCZ2kwbPCEYiexByF5SGAmi4syltCKVENi8fKBUloflJU5a0+mM5y4+nE/EdOmtGEEogmts/OhyAMYawDpItmANTCKISkAMwhSEqA9mC6UIdW7W0wVtLVchkXHaRWHtBZ7LBKuZUmggmsAPBdBNDyyWC4SKmhksE000MrZNJ5BsqbvozdzMUQAAAAABJRU5ErkJggg=="/>
          <h3 style={{ color: '#1CE4C4' }}>To-Do</h3>
          </div>
        </div>
        </Link>
        <Link to=""> {/* add path */}
        <div className="item">
          <div>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAB8klEQVRoQ+2asVLCQBCGd9NgyRvIDBmeIzaSTugEC/EN8AnAJ9A3kMZQil3QAh4BW4EBn0BaHWG9jDDOSC65JYFA5tJmc7vf/f8lN3tBSMmFKeEADbJvSiopUptY2c/vTM0w4JgArF1BEOFMFDglWDy1zedOUN5QkOqbXQMDGmKQ3K4AfPMgNJ28eyOrIRCkMjotIeA9AGYThVgmF8qUZcpIQTw7fc0zk32BWLK0HNO98ptUKcivGsbjPiixqkGsz37bdE9YINWx3QCC5uGDjIpCDSwdPEhlZPeE73b2qlWZsI2sxQCZiv1BS6WQsBgisIImb8sg1HHMbjmsSJX7F+PirfgI1mWxGkRtjaRFEaQBEUm3DiqWWsWIXcRl0Jtyy9bilBotVoOorZFos8x5WiuiFeH4hRGrraWtxbALJ1RbS1uL4xdGrLaWthbDLpxQbS1tLY5fGLHaWum1lmg0CLg+Ac4YjogvdA7vTsH1bQYGdOP/t0zja/vER/Y3kjIIIt095LvX2ygijjGlIOvty4NVZP2gx1OF5vhKxiKRNYILmjqFl4GfgiFHb0cfccge1xgbfUe85OdD2zIQenEVEnWcjUG8xMvjaXGym/wVCWRVfmVYrAPimfBiLjkkGsjOYkJ/GEiuaF5mDcKbr+1Hp0aRHyeBOkI+lonyAAAAAElFTkSuQmCC"/>
          <h3 style={{ color: '#5ADC48' }}>Reading</h3>
          </div>
        </div>
        </Link>
        <Link to=""> {/* add path */}
        <div className="item">
          <div>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADuElEQVRoQ+2aXU7bQBDHd5xEQiqpgviQ+tQgNVR9gxMANwg3ICcoOUHLCaAnKDdoOAG5QdOnqgQJ96kSUGER+pTE05nEgRBi78yaFIriR7y7nt/+52s3gHkmDzwTDjMFeWpKOitylj/ezgC8jwNCNMFCq7Q5/P4i3zwCMIX4OeHuQuttzWWTUoF4Bj4nfJRB5u6CnJwag8VYEDDVxavS/hTEZQfYtaaKxOwcTl3LuNeRqWv9Z1krILHrC603WyPpl9I1bj/19FsHNPUu4mEul/PngmWCGf9c5H+UEbwiIKwTWHkw6rGDvR6GWF36s9JwSuMvjlc9z6MOAbcfB4QMYMNdAUahz1Ku59yi2Hb/snBaaLfbvXYEAAqdbMd/FbzzbfNc3z8oyPlsc8MzZt14pkxNY0+xMQ/HUiM05nDxulR3NXx03oOAMADtOvv5TeDKDIRaO9OuPoRSqUF+zzb3KEg5pca25zYoUujj/HVp1zYu6b0zCMdAt9vdS6oLSsOo7tw9v2jmO4FEEFzclK5kNc0Zxgkkcqcdq1lOA6A22hFIllGDcFU2xvsiWbw/BqKjq0a9cEt75HUAaR6RdRtSEErDm4gYeB58lc4heJ9UWZaPV7bxejXMjc9f5E9IRbkqocHKUmvlQAqjUkRrDKsxKHrcgihVUcWKGKSfqTp0CyKuF/cykHYjMpnsXFIXPayWGKRfvQ3Hx+gT0N99RPAB0Q8989OEppHNZhvjjGD3DA0UMgivEWAVAIvx7Yw86MUgSUdbrT8P70S0LhXW+0pr2noxyPnL5g61EvzBsY8LTLTmhzh31bQuYhBJEdTA2CB6FQjNPvVgVUnmEoPYFBl8TAIjgYhAxM2kGERaQyjwG/NXpbWkXeTLbElRlWzK4DtikCj9XtplhgOqypWkcRI35fnDdcj2XTEIL0R1IPE2XeoOQje9d5ufBKMCke3kbe7vHX29fqZDvP3tQ+KmmkDvbaBNsuH3EvdqZzrL2U62GHP0rdP7yoyZCahLSHRTjVupQSL3Srwt5J20H325tceNuPpB+2uNs1EBVIrwZIeeSyM6jw1ItTXthYQahL+k72TFLHTNGla0hyon1xqYlNBEiq0eGRhQ3ahqziDD850UmQCMsxIDW1KB8CK/Ct+LuW6OGr/4nwssEvUymTYmUgd7nFGRq3Eny9nI9vBPDnR7H35yiYdxi6dWZNyi/TOGx799FHuBSP8kwAcvzkgI+K3jdWppFZiYIjYJJv1+IopM2uh/5lpTkBQ78BedFQ9RtKHkFwAAAABJRU5ErkJggg=="/>
          <h3 style={{ color: '#EC0DDB' }}>Habits</h3>
          </div>
        </div>
        </Link>
        <Link to=""> {/* add path */}
        <div className="item">
          <div>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACGElEQVRoQ+1Z0VXCMBRNygLdQJzAwAKKVX+VDXADnUDcwA1gA/HXI9IJaNyAERhAE197WixN2/RxDjk99fUTkvd67819eUk568jDO4KDEZC2KUmKkCJHYoCW1pGIPTjs/1XkQ4g77nnnBnVKfQVSzjGULoV4YJ53UpyjlHq7ljLExEIrAsmfGOfTYhIIFF5G0QiT/HMwWGnGLow5Wk+BlGdMLAJCiuQYoKVVYp5aj6yE8L8ZEzDI7zEmR1JuXJr9XQjhMdaHgrC1VbFKIHGQHucrAO8nBGj9CJXkxSUQyDWBCjnLBPjRenAjpSyrZpVAlsPhDF5+spvUAiAAah6s1/coIIYRWwCkbq+qVISAILZjW/ktegSlSFypEm9z/rrXPtiXluRao1oUI0dGQtqilABJckD13JZsyPs/AUsRABAl/U9t1UIIYR9aASQ3cRNE0Wk+kOERAmLnufkIUiTHVWp2PzXin1fsZg/BiKWbVZUURg672Xc54nap1iPZn7SPNHcCO+o+0jlFWto0LqBpHKOaxrSNj1rU/W6V1uOqc4n18iFpE+CBA07o+mAFFbSv4JYlPljBwS7Ob7QmGdFWIEUZXR6sEHUD/6GHgJTQayu/pEgTBjqztNJL7FsDtFIb7H1teol9Voyl4RL7SspFE2IPrlqY4C7Hosuvy5fD5CIgGLZcjCVFXLCMyUGKYNhyMZYUccEyJscvV/9qUbLOsG0AAAAASUVORK5CYII="/>
          <h3 style={{ color: '#BD3131' }}>Workouts</h3>
          </div>
        </div>
        </Link>
        <Link to=""> {/* add path */}
        <div className="item">
          <div>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADgklEQVRoQ+2Z333aMBDHT4EBkg1wmr4nG4QNwgDQeAMo7nPCc5yGTkAKAySdgGwQ3psCG5QBMOrJ1I4sCVuW/+BPPvCUgHW6r05395NM4IN8yAfhgANI1SKpHZHJwrkBClcBAKXws/PJHQb/j347l/UaPIS/A6w6p26TBx7PnSlOeBx8tybEtq27WR6Log0yXjgPCNINJyX0sWPd2zxIrQZTzikGchIF6S8ASCP4zvOgaX92X/YMQp471l0rBFl0j2u0/jcOZDJ3XinAefAM2dBW++z+uVSQyVv/ih6Rp/gVd9DP949H1pZtDZfBN+NFfwSUXIcgBG7bljsoFWQkrziIjkorLjjK8gxz6zYEAZi1T92LUkHYZJisbOuEyYp/v/AJLeURPsDDKqIKmHc9vmiYQmknuw/yx+li5wkrkz8p54gqaiKsGDVmQoysCUwqEDaBwpEVOnIR5IIGbAOLAlavyCcS2VJAcNUTHTGC3Wzsztn3RxMINiZ1RPyoCEm73R4Eo7JtbipYIia+UIpxmNR30kAZgfj5Mo82NzFp5QYq9R0psrhFT3CLrtIABM+ag0idHoYdy+0FhjX7TqQKZun05iBiBSOJnZ5Vp8iKM+2F4JdhBDKUYnOQt6/XcHQ04rZBpPLoNNBKgDC1iyLxJgQhMOO31n8QXtKwiKDa5SWLL0R57fXDVHsZR8QkIYscsxOEldAiJza1zUeUtyGBMIA6rT/xctt00iLGocMz1YFMAhGldhHOZLYpHOqUnV2qJJlnzd8Ai4oo/xUREY60+fuR3aJORFQ6KvvMOVsgURWh3FrKw0/OfmQ2p1DKiqr17bxG6WvmyQo0oLq0UJVf8TakQJeMTEcOcrHqt9IlWBCnsSA7ToFGy5f3oF1Sf6dEkQ5OeXtkYE/VP2Ijwn4cyzLdYOp8h4jH5VitFfzIZDhqrml1NBddesRjtzXKo3CsjK9QrqwwN1pxF96J55FKNEiNI3AiiJ8vwuVzvjs/wZpCV6lGaIGwgaqrzqKBtmePdVPnikgbZBuZEpUxCkMP1gMdCKVoTFrlEsryCi8kBmlv6FNF5L00M2G5wRsS0kgCT/O7v5U86Jm8jjMCKaxhalSnXQtzACkkVzK8WjCOyI63U2lSQnqWfzWR1pAxCJcnX/D9W8akJ0usVL/SViot0Zh2Rfb9fKaI7Nv5Q0SqFAHRl3/T++xCNlZ7eAAAAABJRU5ErkJggg=="/>
          <h3 style={{ color: '#A2DE74' }}>Meals</h3>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
};
