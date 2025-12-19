import React from "react";
import Section from "@/components/sections/Section";
import { Configurator3D } from "@/components/ui/Configurator3D";
import {
  configurator3DConfigurations,
  configurator3DInitialConfigurationId,
  configurator3DModules,
} from "@/react-pages/features/sections/configurator3d/spec";

export default function ConfiguratorSection() {
  return (
    <Section
      id="builder"
      title="Configurations"
      subtitle="Preview supported module combinations by toggling different parts. Drag the robot to rotate."
      variant="secondary"
    >
      <div className="max-w-6xl mx-auto">
        <Configurator3D
          initialConfigurationId={configurator3DInitialConfigurationId}
          configurations={configurator3DConfigurations}
          modules={configurator3DModules}
          worldOffset={[0, -0.8, 0]}
          urlSync
          urlParam="config"
        />
      </div>
    </Section>
  );
}
