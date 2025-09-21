import axios from 'axios';
import { Platform } from 'react-native';

export interface NetworkDiagnosticResult {
  url: string;
  status: 'success' | 'failed';
  responseTime?: number;
  error?: string;
}

export const runNetworkDiagnostic = async (): Promise<NetworkDiagnosticResult[]> => {
  const urls = [
    'https://web-production-af45d.up.railway.app/api',
    'https://httpbin.org/get', // Public test API
    'https://jsonplaceholder.typicode.com/posts/1', // Another public test API
  ];

  const results: NetworkDiagnosticResult[] = [];

  for (const url of urls) {
    const startTime = Date.now();
    try {
      const response = await axios.get(`${url.includes('api') ? url + '/dashboard-stats' : url}`, {
        timeout: 10000,
      });
      
      const responseTime = Date.now() - startTime;
      results.push({
        url,
        status: 'success',
        responseTime,
      });
    } catch (error: any) {
      results.push({
        url,
        status: 'failed',
        error: error.message || 'Unknown error',
      });
    }
  }

  return results;
};

export const formatDiagnosticResults = (results: NetworkDiagnosticResult[]): string => {
  let report = 'Network Diagnostic Report:\n\n';
  
  results.forEach((result, index) => {
    report += `${index + 1}. ${result.url}\n`;
    report += `   Status: ${result.status}\n`;
    
    if (result.status === 'success') {
      report += `   Response Time: ${result.responseTime}ms\n`;
    } else {
      report += `   Error: ${result.error}\n`;
    }
    report += '\n';
  });

  // Add platform info
  report += `Platform: ${Platform.OS}\n`;
  
  // Safely access platform constants
  const constants = Platform.constants as any;
  if (constants.systemName && constants.systemVersion) {
    report += `System: ${constants.systemName} ${constants.systemVersion}`;
  } else {
    report += `System: ${Platform.OS} device`;
  }

  return report;
};
