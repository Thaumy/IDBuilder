﻿#pragma checksum "C:\Users\Thaumy\Desktop\GitHub\IDBuilder\IDBuilder3\IDBuilder3\MainPage.xaml" "{406ea660-64cf-4c82-b6f0-42d48172a799}" "3B0C87B5315C420E7DB17F7CC7A67639"
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace IDBuilder3
{
    partial class MainPage : 
        global::Windows.UI.Xaml.Controls.Page, 
        global::Windows.UI.Xaml.Markup.IComponentConnector,
        global::Windows.UI.Xaml.Markup.IComponentConnector2
    {
        /// <summary>
        /// Connect()
        /// </summary>
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Windows.UI.Xaml.Build.Tasks"," 10.0.18362.1")]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        public void Connect(int connectionId, object target)
        {
            switch(connectionId)
            {
            case 2: // MainPage.xaml line 42
                {
                    this.tb1 = (global::Windows.UI.Xaml.Controls.TextBox)(target);
                }
                break;
            case 3: // MainPage.xaml line 44
                {
                    this.tb4 = (global::Windows.UI.Xaml.Controls.TextBox)(target);
                }
                break;
            case 4: // MainPage.xaml line 46
                {
                    this.tb2 = (global::Windows.UI.Xaml.Controls.TextBox)(target);
                }
                break;
            case 5: // MainPage.xaml line 48
                {
                    this.tb3 = (global::Windows.UI.Xaml.Controls.TextBox)(target);
                }
                break;
            case 6: // MainPage.xaml line 49
                {
                    global::Windows.UI.Xaml.Controls.Button element6 = (global::Windows.UI.Xaml.Controls.Button)(target);
                    ((global::Windows.UI.Xaml.Controls.Button)element6).Click += this.generate;
                }
                break;
            case 7: // MainPage.xaml line 52
                {
                    this.rsa1 = (global::Windows.UI.Xaml.Controls.TextBox)(target);
                }
                break;
            case 8: // MainPage.xaml line 54
                {
                    this.rsa2 = (global::Windows.UI.Xaml.Controls.TextBox)(target);
                }
                break;
            case 9: // MainPage.xaml line 57
                {
                    this.rsa_en_de = (global::Windows.UI.Xaml.Controls.TextBox)(target);
                }
                break;
            case 10: // MainPage.xaml line 60
                {
                    this.input = (global::Windows.UI.Xaml.Controls.TextBox)(target);
                }
                break;
            case 11: // MainPage.xaml line 62
                {
                    global::Windows.UI.Xaml.Controls.Button element11 = (global::Windows.UI.Xaml.Controls.Button)(target);
                    ((global::Windows.UI.Xaml.Controls.Button)element11).Click += this.md5_convert_btn_click;
                }
                break;
            case 12: // MainPage.xaml line 63
                {
                    global::Windows.UI.Xaml.Controls.Button element12 = (global::Windows.UI.Xaml.Controls.Button)(target);
                    ((global::Windows.UI.Xaml.Controls.Button)element12).Click += this.sha1_convert_btn_click;
                }
                break;
            case 13: // MainPage.xaml line 64
                {
                    global::Windows.UI.Xaml.Controls.Button element13 = (global::Windows.UI.Xaml.Controls.Button)(target);
                    ((global::Windows.UI.Xaml.Controls.Button)element13).Click += this.rsa_convert_btn_click;
                }
                break;
            default:
                break;
            }
            this._contentLoaded = true;
        }

        /// <summary>
        /// GetBindingConnector(int connectionId, object target)
        /// </summary>
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Windows.UI.Xaml.Build.Tasks"," 10.0.18362.1")]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        public global::Windows.UI.Xaml.Markup.IComponentConnector GetBindingConnector(int connectionId, object target)
        {
            global::Windows.UI.Xaml.Markup.IComponentConnector returnValue = null;
            return returnValue;
        }
    }
}

