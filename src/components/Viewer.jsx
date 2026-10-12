import { T } from "gt-react";

export function Viewer() {
  return (
    <dialog className="viewer" aria-labelledby="viewer-caption">
      <figure>
        <img alt="" id="viewer-image" />
        <figcaption id="viewer-caption"></figcaption>
      </figure>
      <div className="viewer-bar">
        <button type="button" data-dir="-1"><T>Previous</T></button>
        <button type="button" data-dir="1"><T>Next</T></button>
        <form method="dialog"><button className="viewer-close" value="close"><T>Close</T></button></form>
      </div>
    </dialog>
  );
}
