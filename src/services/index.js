import audits from './audits_service';
import configuration from './configuration_service';
import health from './health_service';
import logs from './logs_service';
import metrics from './metrics_service';

export default {
  audits: audits,
  configuration: configuration,
  health: health,
  logs: logs,
  metrics: metrics
}
