const GenerateRandomValue = (minium, maximum) => {
  return Math.random() * (maximum - minium) + minium;
};

const Spinner = ({
  targetRef = null,
  isSpinning = false,
  setIsSpinning = () => {},
  isAccelerating = false,
  setIsAccelerating = () => {},
  segments = [],
  setSelectedSegment = () => {},
  friciton = 0.95, // 0.95=soft, 0.99=mid, 0.98=hard
  angleMinimumVelocity = 0.002, // Below that number will be treated as a stop
}) => {
  let angle = 0; // Angle rotation in radians
  let angleVelocity = 0; // Current angular velocity
  let angleMaximumVelocity = 0; // Random angleMaximumVelocity to accelerate to

  let _isSpinning = isSpinning; // Is spinning?
  let _isAccelerating = isAccelerating; // Is accelerating?
  let animationFrame = null; // Engine's requestAnimationFrame

  const GetIndex = () => {
    // console.log(segments)
    // console.log(angle, angle / (2 * Math.PI) * segments.length, segments.length)
    const _ =
      Math.floor(segments.length - (angle / (2 * Math.PI)) * segments.length) %
      segments.length;
    // console.log(_ - 1)
    return segments.length < 5 ? (_ - 1 < 0 ? segments.length - 1 : _ - 1) : _;
    // return _
  };

  const RenderFrame = () => {
    if (!_isSpinning) return;

    if (angleVelocity >= angleMaximumVelocity) {
      _isAccelerating = false;
      // setIsAccelerating(_isAccelerating)
    }

    if (_isAccelerating) {
      angleVelocity ||= angleMinimumVelocity; // Initial Velocity Kick
      angleVelocity *= 1.06; // Accelerate
    } else {
      _isAccelerating = false;
      // setIsAccelerating(_isAccelerating)

      // Decelerate by friction
      angleVelocity *= friciton;

      // SPIN END:
      if (angleVelocity < angleMinimumVelocity) {
        // Update the selected segment
        setSelectedSegment(segments[GetIndex()]);

        _isSpinning = false;
        setIsSpinning(_isSpinning);

        angleVelocity = 0;
        cancelAnimationFrame(animationFrame);
      }
    }

    angle += angleVelocity; // Update Angle
    angle %= 2 * Math.PI; // Normalize Angle

    targetRef.current.style.transform = `rotate(${angle}rad)`;
  };

  const engine = () => {
    RenderFrame();
    animationFrame = requestAnimationFrame(engine);
  };

  (() => {
    if (_isSpinning) return;

    _isSpinning = true;
    setIsSpinning(_isSpinning);

    _isAccelerating = true;
    setIsAccelerating(_isAccelerating);

    angleMaximumVelocity = GenerateRandomValue(0.55, 0.8);
    engine(); // Start engine!
  })();
};

export default Spinner;
