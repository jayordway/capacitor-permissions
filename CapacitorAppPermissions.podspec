
  Pod::Spec.new do |s|
    s.name = 'CapacitorAppPermissions'
    s.version = '0.0.1'
    s.summary = 'A Capacitor plugin for accessing and requesting app permissions'
    s.license = ''
    s.homepage = 'https://github.com/jayordway/capacitor-app-permissions.git'
    s.author = 'Jay Ordway'
    s.source = { :git => 'https://github.com/jayordway/capacitor-app-permissions.git', :tag => s.version.to_s }
    s.source_files = 'ios/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.ios.deployment_target  = '11.0'
    s.dependency 'Capacitor'
  end