import { Select } from "@fluentui/react-components";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { SampleConfig } from "../index.js";
import { PlaygroundManifest } from "../manifest.js";
export interface SamplesDropdownProps {
  onSelectSample: (content: SampleConfig) => void | Promise<void>;
}
export const SamplesDropdown: FunctionComponent<SamplesDropdownProps> = ({ onSelectSample }) => {
  const [selected, setSelected] = useState<string>("");
  const options = Object.keys(PlaygroundManifest.samples).map((sample) => {
    return <option key={sample}>{sample}</option>;
  });

  useEffect(() => {
    if (window.location.search.length > 0) {
      const parsed = new URLSearchParams(window.location.search);
      const sample = parsed.get("sample");
      if (sample) {
        setSelected(sample);
        onSelectSample(PlaygroundManifest.samples[sample]);
      }
    }
  }, []);

  const handleSelected = useCallback(
    (evt: any) => {
      setSelected(evt.target.value);

      onSelectSample(PlaygroundManifest.samples[evt.target.value]);
    },
    [onSelectSample]
  );
  return (
    <Select className="sample-dropdown" onChange={handleSelected} value={selected}>
      <option value="" disabled>
        Select sample...
      </option>
      {options}
    </Select>
  );
};
