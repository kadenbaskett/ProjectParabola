import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Interval, intervals } from "@/app/common/intervals";
import { Interface } from "readline";

interface IntervalDropdownProps {
  interval: number;
  setInterval: Dispatch<SetStateAction<number>>;
}

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

const IntervalDropdown: React.FC<IntervalDropdownProps> = ({
  interval,
  setInterval,
}) => {
  const [displayedInterval, setDisplayedInterval] = useState<string>(
    intervals[0].displayedInterval
  );

  const handleSelection = (interval: Interval) => {
    setDisplayedInterval(interval.displayedInterval);
    setInterval(interval.interval);
  };

  return (
    <Menu
      as="div"
      className="relative inline-block text-left border border-violet-600 rounded-lg m-2"
    >
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-lg bg-black px-4 py-2">
          {displayedInterval}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="inline-flex border border-white absolute right-0 z-20 mt-2 origin-top-right text-center rounded-lg bg-black">
          <div className="">
            {intervals.map((interval, index) => (
              <>
                <Menu.Item>
                  <button
                    onClick={() => handleSelection(interval)}
                    className={classNames(
                      interval.displayedInterval === displayedInterval
                        ? "bg-violet-600 bg-opacity-70"
                        : "",
                      index !== intervals.length - 1
                        ? "border-b border-white"
                        : "rounded-b-lg",
                      index !== 0 ? "" : "rounded-t-lg",
                      "block px-4 py-2 text-white w-full"
                    )}
                  >
                    {interval.displayedInterval}
                  </button>
                </Menu.Item>
              </>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default IntervalDropdown;
